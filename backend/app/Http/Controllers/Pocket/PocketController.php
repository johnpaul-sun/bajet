<?php

namespace App\Http\Controllers\Pocket;

use App\Http\Controllers\Controller;
use App\Models\Pocket;
use App\Models\PocketTransaction;
use App\Models\User;
use Illuminate\Http\Request;

class PocketController extends Controller
{
    // Display all listing of active the Pocket.
    public function index()
    {
        $data = Pocket::where("is_active", 1)->with('pocketTransaction')->paginate(3);

        return response($data);
    }

    public function allArchive()
    {
        $data = Pocket::where("is_active", 0)->with('pocketTransaction')->get();

        return response($data);
    }

    public function store(Request $request)
    {
        Pocket::verifyPocket($request);

        $userId = User::id();

        Pocket::create([
            "user_id" => $userId,
            "name" => $request->name,
            "amount" => $request->amount,
            "is_active" => true,
            "schedule" => $request->schedule,
            "schedule_date" => $request->schedule_date
        ]);

        return response()->json([
            "message" => "Pocket created successfully"
        ]);
    }

    public function show($pocket_id)
    {
        return response(Pocket::with('pocketTransaction')->findOrFail($pocket_id));
    }

    public function update(Request $request, $pocket_id)
    {
        Pocket::verifyUpdatePocket($request);
        $pocket = Pocket::findOrFail($pocket_id);

        $pocket->update([
            "name" => $request->name ? $request->name : $pocket->name,
            "amount" => $request->amount ? $request->amount : $pocket->amount,
            "schedule" => $request->schedule ? $request->schedule : $pocket->schedule,
            "schedule_date" => $request->schedule_date ? $request->schedule_date : $pocket->schedule_date
        ]);

        return response()->json([
            "message" => "Pocket data has been updated"
        ]);
    }

    public function archive($pocket_id)
    {
        Pocket::findOrFail($pocket_id)->update(['is_active' => false]);

        return response()->json([
            "message" => "Pocket has been archived"
        ]);
    }

    public function unarchive($pocket_id)
    {
        Pocket::findOrFail($pocket_id)->update(['is_active' => true]);

        return response()->json([
            "message" => "Pocket has been unarchived"
        ]);
    }

    public function destroy($pocket_id)
    {
        Pocket::findOrFail($pocket_id)->delete();

        return response()->json([
            "message" => "Pocket has been deleted"
        ]);
    }

    public function search($pocket_name)
    {
        $result = Pocket::where("name", "like", "%$pocket_name%")->get();

        if (count($result) === 0) return response()->json([
            'message' => "Can't find $pocket_name."
        ], 200);

        return response()->json($result, 200);
    }
}
