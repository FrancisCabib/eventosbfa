import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ServiceController::index
 * @see app/Http/Controllers/Admin/ServiceController.php:15
 * @route '/admin/services'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/services',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ServiceController::index
 * @see app/Http/Controllers/Admin/ServiceController.php:15
 * @route '/admin/services'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ServiceController::index
 * @see app/Http/Controllers/Admin/ServiceController.php:15
 * @route '/admin/services'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ServiceController::index
 * @see app/Http/Controllers/Admin/ServiceController.php:15
 * @route '/admin/services'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ServiceController::index
 * @see app/Http/Controllers/Admin/ServiceController.php:15
 * @route '/admin/services'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ServiceController::index
 * @see app/Http/Controllers/Admin/ServiceController.php:15
 * @route '/admin/services'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ServiceController::index
 * @see app/Http/Controllers/Admin/ServiceController.php:15
 * @route '/admin/services'
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
/**
* @see \App\Http\Controllers\Admin\ServiceController::store
 * @see app/Http/Controllers/Admin/ServiceController.php:31
 * @route '/admin/services'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/services',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ServiceController::store
 * @see app/Http/Controllers/Admin/ServiceController.php:31
 * @route '/admin/services'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ServiceController::store
 * @see app/Http/Controllers/Admin/ServiceController.php:31
 * @route '/admin/services'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ServiceController::store
 * @see app/Http/Controllers/Admin/ServiceController.php:31
 * @route '/admin/services'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ServiceController::store
 * @see app/Http/Controllers/Admin/ServiceController.php:31
 * @route '/admin/services'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ServiceController::update
 * @see app/Http/Controllers/Admin/ServiceController.php:48
 * @route '/admin/services/{service}'
 */
export const update = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/services/{service}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ServiceController::update
 * @see app/Http/Controllers/Admin/ServiceController.php:48
 * @route '/admin/services/{service}'
 */
update.url = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { service: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    service: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        service: typeof args.service === 'object'
                ? args.service.id
                : args.service,
                }

    return update.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ServiceController::update
 * @see app/Http/Controllers/Admin/ServiceController.php:48
 * @route '/admin/services/{service}'
 */
update.put = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\ServiceController::update
 * @see app/Http/Controllers/Admin/ServiceController.php:48
 * @route '/admin/services/{service}'
 */
    const updateForm = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ServiceController::update
 * @see app/Http/Controllers/Admin/ServiceController.php:48
 * @route '/admin/services/{service}'
 */
        updateForm.put = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\ServiceController::destroy
 * @see app/Http/Controllers/Admin/ServiceController.php:65
 * @route '/admin/services/{service}'
 */
export const destroy = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/services/{service}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ServiceController::destroy
 * @see app/Http/Controllers/Admin/ServiceController.php:65
 * @route '/admin/services/{service}'
 */
destroy.url = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { service: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    service: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        service: typeof args.service === 'object'
                ? args.service.id
                : args.service,
                }

    return destroy.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ServiceController::destroy
 * @see app/Http/Controllers/Admin/ServiceController.php:65
 * @route '/admin/services/{service}'
 */
destroy.delete = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ServiceController::destroy
 * @see app/Http/Controllers/Admin/ServiceController.php:65
 * @route '/admin/services/{service}'
 */
    const destroyForm = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ServiceController::destroy
 * @see app/Http/Controllers/Admin/ServiceController.php:65
 * @route '/admin/services/{service}'
 */
        destroyForm.delete = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Admin\ServiceController::toggle
 * @see app/Http/Controllers/Admin/ServiceController.php:72
 * @route '/admin/services/{service}/toggle'
 */
export const toggle = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggle.url(args, options),
    method: 'patch',
})

toggle.definition = {
    methods: ["patch"],
    url: '/admin/services/{service}/toggle',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\ServiceController::toggle
 * @see app/Http/Controllers/Admin/ServiceController.php:72
 * @route '/admin/services/{service}/toggle'
 */
toggle.url = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { service: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    service: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        service: typeof args.service === 'object'
                ? args.service.id
                : args.service,
                }

    return toggle.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ServiceController::toggle
 * @see app/Http/Controllers/Admin/ServiceController.php:72
 * @route '/admin/services/{service}/toggle'
 */
toggle.patch = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggle.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\ServiceController::toggle
 * @see app/Http/Controllers/Admin/ServiceController.php:72
 * @route '/admin/services/{service}/toggle'
 */
    const toggleForm = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ServiceController::toggle
 * @see app/Http/Controllers/Admin/ServiceController.php:72
 * @route '/admin/services/{service}/toggle'
 */
        toggleForm.patch = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggle.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggle.form = toggleForm
const services = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
toggle: Object.assign(toggle, toggle),
}

export default services