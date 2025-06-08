<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'category_id' => 'required|exists:categories,id',
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_date'  => 'required|date',
            'event_time'  => 'required',
            'location'    => 'required|string|max:255',
            'address'     => 'required|string',
            'guest_count' => 'required|integer|min:1',
            'budget'      => 'required|numeric|min:0',
            'status'      => 'in:draft,planning,confirmed,completed,cancelled',
            'progress'    => 'integer|min:0|max:100',
        ];
    }
}