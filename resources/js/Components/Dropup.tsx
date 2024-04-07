import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import React, { PropsWithChildren, useState } from 'react';

interface Props {
  align?: string;
  width?: string | number;
  contentClasses?: string;
  renderTrigger(): JSX.Element;
}

export default function Dropup({
  align = 'right',
  width = '48',
  contentClasses = 'py-1 bg-white dark:bg-gray-700',
  renderTrigger,
  children,
}: PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false);

  const widthClass = {
    '48': 'w-48',
  }[width.toString()];

  const alignmentClasses = (() => {
    if (align === 'left') {
      return 'origin-bottom-left left-0';
    } else if (align === 'right') {
      return 'origin-bottom-right right-0';
    } else {
      return 'origin-bottom';
    }
  })();

  return (
    <div className=" ">
      <div onClick={() => setOpen(!open)}>{renderTrigger()}</div>

      {/* <!-- Full Screen Dropdown Overlay --> */}
      <div
        className="fixed inset-0 z-40 "
        style={{ display: open ? 'block bottom-0 right-0' : 'none' }}
        onClick={() => setOpen(false)}
      />

      <Transition
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        className={'absolute z-50'}
      >
        <div
          className={classNames(
            'absolute mt-2 rounded-md shadow-lg origin-top ',
            widthClass,
//            alignmentClasses,
          )}
          onClick={() => setOpen(false)}
        >
          <div
            className={classNames(
              'rounded-md ring-1 ring-black ring-opacity-5',
              contentClasses,
            )}
          >
            {children}
          </div>
        </div>
      </Transition>
    </div>
  );
}
