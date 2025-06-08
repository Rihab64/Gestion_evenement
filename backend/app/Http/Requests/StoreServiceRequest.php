<?php

class StoreServiceRequest
{
    public function rules(): array
    {
        return [
            'category_id' => 'required|exists:categories,id',
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'price_type'  => 'required|in:fixed,per_hour,per_person,custom',
            'base_price'  => 'required|numeric|min:0',
            'is_active'   => 'boolean',
        ];
    }
}