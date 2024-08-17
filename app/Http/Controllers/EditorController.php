<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EditorController extends Controller
{
    public function savePage(Request $request): JsonResponse
    {
        $row = Page::where('id', $request->id)->first();
        if (!$row) {
            $row = new Page;
        }
        if ($request->background) {
            $row->background = $request->background;
        }
        $row->save();
        return response()->json($row);
    }

    public function getPages(): JsonResponse
    {
        return response()->json(['pages' => Page::get()]);
    }

    public function deletePage(Request $request): bool
    {
        return Page::where('id', $request->id)->delete();
    }
}
