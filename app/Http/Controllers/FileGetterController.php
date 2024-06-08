<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileGetterController extends Controller
{
    //

    public function get_songs($artist_id, $nome_arquivo)
    {
        // Verifique se o arquivo existe no diretório de armazenamento
        if (Storage::exists("public/artists/{$artist_id}/songs/{$nome_arquivo}")) {
            // Obtenha o caminho completo do arquivo
            $caminho_arquivo = storage_path("app/public/artists/{$artist_id}/songs/{$nome_arquivo}");

            // Retorne o arquivo como resposta HTTP
            return response()->file($caminho_arquivo);
        } else {
            // Se o arquivo não existir, retorne uma resposta de erro 404
            abort(404);
        }
    }

    public function get_videos($user_id, $nome_arquivo)
    {
        // Verifique se o arquivo existe no diretório de armazenamento
        if (Storage::exists("public/users/{$user_id}/videos/{$nome_arquivo}")) {
            // Obtenha o caminho completo do arquivo
            $caminho_arquivo = storage_path("app/public/users/{$user_id}/videos/{$nome_arquivo}");

            // Retorne o arquivo como resposta HTTP
            return response()->file($caminho_arquivo);
        } else {
            // Se o arquivo não existir, retorne uma resposta de erro 404
            abort(404);
        }
    }

    public function get_profiles_pictures($nome_arquivo)
    {
        // Verifique se o arquivo existe no diretório de armazenamento
        if (Storage::exists("public/profile-photos/{$nome_arquivo}")) {
            // Obtenha o caminho completo do arquivo
            $caminho_arquivo = storage_path("app/public/profile-photos/{$nome_arquivo}");

            // Retorne o arquivo como resposta HTTP
            return response()->file($caminho_arquivo);
        } else {
            // Se o arquivo não existir, retorne uma resposta de erro 404
            abort(404);
        }
    }

    public function get_post_files($post_id, $nome_arquivo)
    {
        // Verifique se o arquivo existe no diretório de armazenamento
        if (Storage::exists("public/posts/$nome_arquivo")) {
            // Obtenha o caminho completo do arquivo
            $caminho_arquivo = storage_path("app/public/posts/$nome_arquivo");

            // Retorne o arquivo como resposta HTTP
            return response()->file($caminho_arquivo);
        } else {
            // Se o arquivo não existir, retorne uma resposta de erro 404
            abort(404);
        }
    }

    public function get_arts_itens($exposition_id, $nome_arquivo)
    {
        // Verifique se o arquivo existe no diretório de armazenamento
        if (Storage::exists("public/users/expositions/{$exposition_id}/items/{$nome_arquivo}")) {
            // Obtenha o caminho completo do arquivo
            $caminho_arquivo = storage_path("app/public/users/expositions/{$exposition_id}/items/{$nome_arquivo}");
            // Retorne o arquivo como resposta HTTP
            return response()->file($caminho_arquivo);
        } else {
            // Se o arquivo não existir, retorne uma resposta de erro 404
            abort(404);
        }
    }

    public function get_estante_cover($estante_id, $nome_arquivo)
    {
        // Verifique se o arquivo existe no diretório de armazenamento
        if (Storage::exists("public/users/estantes/{$estante_id}/covers/{$nome_arquivo}")) {
            // Obtenha o caminho completo do arquivo
            $caminho_arquivo = storage_path("app/public/users/estantes/{$estante_id}/covers/{$nome_arquivo}");
            // Retorne o arquivo como resposta HTTP
            return response()->file($caminho_arquivo);
        } else {
            // Se o arquivo não existir, retorne uma resposta de erro 404
            abort(404);
        }
    }



    public function get_book($estante_id, $nome_arquivo)
    {
        // Verifique se o arquivo existe no diretório de armazenamento
        if (Storage::exists("public/users/estantes/{$estante_id}/books/{$nome_arquivo}")) {
            // Obtenha o caminho completo do arquivo
            $caminho_arquivo = storage_path("app/public/users/estantes/{$estante_id}/books/{$nome_arquivo}");
            // Retorne o arquivo como resposta HTTP
            return response()->file($caminho_arquivo);
        } else {
            // Se o arquivo não existir, retorne uma resposta de erro 404
            abort(404);
        }
    }
}
