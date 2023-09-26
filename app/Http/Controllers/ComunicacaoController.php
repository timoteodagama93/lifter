<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ComunicacaoController extends Controller
{
    //

    public function get_unread()
    {
        return Notification::where(['user_id' => auth()->id(), 'status_read' => false])->count();
    }
}
