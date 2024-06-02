import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

class AudioBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.setAttribute('controls', '');
    node.setAttribute('src', value);
    return node;
  }

  static value(node) {
    return node.getAttribute('src');
  }
}

AudioBlot.blotName = 'audio';
AudioBlot.tagName = 'audio';

Quill.register(AudioBlot);
