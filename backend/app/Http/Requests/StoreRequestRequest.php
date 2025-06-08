<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequestRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'provider_id' => 'required|exists:providers,id',
            'event_id'    => 'required|exists:events,id',
            'service_id'  => 'required|exists:services,id',
            'message'     => 'nullable|string',
            'budget_range'=> 'nullable|string',
        ];
    }
}