import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\CatalogController::index
 * @see app/Http/Controllers/Api/CatalogController.php:11
 * @route '/api/catalog'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/catalog',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\CatalogController::index
 * @see app/Http/Controllers/Api/CatalogController.php:11
 * @route '/api/catalog'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CatalogController::index
 * @see app/Http/Controllers/Api/CatalogController.php:11
 * @route '/api/catalog'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\CatalogController::index
 * @see app/Http/Controllers/Api/CatalogController.php:11
 * @route '/api/catalog'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\CatalogController::index
 * @see app/Http/Controllers/Api/CatalogController.php:11
 * @route '/api/catalog'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\CatalogController::index
 * @see app/Http/Controllers/Api/CatalogController.php:11
 * @route '/api/catalog'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\CatalogController::index
 * @see app/Http/Controllers/Api/CatalogController.php:11
 * @route '/api/catalog'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const catalog = {
    index: Object.assign(index, index),
}

export default catalog