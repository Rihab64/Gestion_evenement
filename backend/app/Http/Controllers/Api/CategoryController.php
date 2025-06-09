<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories (Public route)
     */
    public function index(): JsonResponse
    {
        try {
            $categories = Category::where('status', true)
                ->withCount('services')
                ->orderBy('name', 'asc')
                ->get();
            
            return response()->json([
                'success' => true,
                'data' => $categories,
                'message' => 'Categories retrieved successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving categories',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created category (Admin only)
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255|unique:categories',
                'description' => 'nullable|string|max:1000',
                'icon' => 'nullable|string|max:100',
                'color' => 'nullable|string|max:7|regex:/^#[0-9A-Fa-f]{6}$/',
                'status' => 'boolean',
                'is_featured' => 'boolean',
                'sort_order' => 'nullable|integer|min:0'
            ]);

            // Generate slug from name
            $validatedData['slug'] = Str::slug($validatedData['name']);
            
            // Set default values
            $validatedData['status'] = $validatedData['status'] ?? true;
            $validatedData['is_featured'] = $validatedData['is_featured'] ?? false;
            $validatedData['sort_order'] = $validatedData['sort_order'] ?? 0;

            $category = Category::create($validatedData);

            return response()->json([
                'success' => true,
                'data' => $category,
                'message' => 'Category created successfully'
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified category (Public route)
     */
    public function show($id): JsonResponse
    {
        try {
            $category = Category::where('status', true)
                ->withCount(['services' => function ($query) {
                    $query->where('status', 'active');
                }])
                ->with(['services' => function ($query) {
                    $query->where('status', 'active')
                          ->with('provider:id,name,rating,avatar')
                          ->take(6);
                }])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $category,
                'message' => 'Category retrieved successfully'
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified category (Admin only)
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $category = Category::findOrFail($id);

            $validatedData = $request->validate([
                'name' => 'required|string|max:255|unique:categories,name,' . $id,
                'description' => 'nullable|string|max:1000',
                'icon' => 'nullable|string|max:100',
                'color' => 'nullable|string|max:7|regex:/^#[0-9A-Fa-f]{6}$/',
                'status' => 'boolean',
                'is_featured' => 'boolean',
                'sort_order' => 'nullable|integer|min:0'
            ]);

            // Update slug if name changed
            if ($validatedData['name'] !== $category->name) {
                $validatedData['slug'] = Str::slug($validatedData['name']);
            }

            $category->update($validatedData);

            return response()->json([
                'success' => true,
                'data' => $category->fresh(),
                'message' => 'Category updated successfully'
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified category (Admin only)
     */
    public function destroy($id): JsonResponse
    {
        try {
            $category = Category::findOrFail($id);
            
            // Check if category has services
            if ($category->services()->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot delete category with existing services'
                ], 409);
            }

            $category->delete();

            return response()->json([
                'success' => true,
                'message' => 'Category deleted successfully'
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get featured categories (Public route)
     */
    public function featured(): JsonResponse
    {
        try {
            $categories = Category::where('status', true)
                ->where('is_featured', true)
                ->withCount('services')
                ->orderBy('sort_order', 'asc')
                ->orderBy('name', 'asc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $categories,
                'message' => 'Featured categories retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving featured categories',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get categories with statistics (Admin only)
     */
    public function withStats(): JsonResponse
    {
        try {
            $categories = Category::withCount([
                'services',
                'services as active_services_count' => function ($query) {
                    $query->where('status', 'active');
                }
            ])
            ->orderBy('name', 'asc')
            ->get();

            return response()->json([
                'success' => true,
                'data' => $categories,
                'message' => 'Categories with statistics retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving categories statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Search categories (Public route)
     */
    public function search(Request $request): JsonResponse
    {
        try {
            $query = $request->get('q', '');
            
            $categories = Category::where('status', true)
                ->where(function ($queryBuilder) use ($query) {
                    $queryBuilder->where('name', 'LIKE', "%{$query}%")
                                ->orWhere('description', 'LIKE', "%{$query}%");
                })
                ->withCount('services')
                ->orderBy('name', 'asc')
                ->limit(10)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $categories,
                'query' => $query,
                'message' => 'Category search completed successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error searching categories',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}