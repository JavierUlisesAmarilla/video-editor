<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EditorController extends Controller
{
    public function savePage(Request $request): JsonResponse
    {
        $id = $request->id;
        $background = $request->background;
        $row = Page::where('id', $id)->first();
        if (!$row) {
            $row = new Page;
        }
        if ($background) {
            $row->background = $background;
        }
        $row->save();
        return response()->json($row);
    }
}
