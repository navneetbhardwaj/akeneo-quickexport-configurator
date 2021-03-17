# Akeneo Quick Export configurator for akeneo 5
with the help of this extenion you can configured the quickexport option dynamically.

### How to download and install the connector:

Install composer dependency

```shell
composer require navneetbhardwaj/akeneo-quickexport-configurator
```

register bundle in `config/bundles.php`

```php

return [
    \Webkul\QuickExportConfiguratorBundle\QuickExportConfiguratorBundle::class => ['all' => true],
];

```

define routing to create a file in the config/routes/wk_quick_export.yml

```dotenv
wk_quick_expoort:
    resource: "@QuickExportConfiguratorBundle/Resources/config/routing.yml"
    prefix:   /
```

Clear the cache and registered the route and js modules using commands

```shell
php bin/console cache:clear --env=prod;
php bin/console pim:installer:assets --symlink --clean --env=prod; 
php bin/console d:s:u --force;
yarn run webpack;
yarnpkg run update-extensions;
yarnpkg run less;
```
### How to configure quick export in your module:
1. create an action in the file Resources/config/datagrid/quickexport.yml
e.g replace quick_export_connectorname with your bundle name like quick_export_magento2 
```dotenv
datagrid:
    product-grid:
        mass_actions:
            quick_export_connectorname: 
                type: export
                label: pim.grid.mass_action.quick_export.connector
                handler: product_quick_export
                route: pim_datagrid_export_product_index
                route_parameters:                   
                    _format: html
                    _contentType: text/html
                    _jobCode: connector_product_quick_export
                    _displayedColumnsOnly: 0
                context:
                    withHeader: true
                messages:
                    empty_selection: pim_datagrid.mass_action.delete.empty_selection
                launcherOptions:
                    group: quick_export
            quick_export_grid_context_connectorname: 
                type: export
                label: pim.grid.mass_action.quick_export.connector
                handler: product_quick_export
                route: pim_datagrid_export_product_index
                route_parameters:                   
                    _format: html
                    _contentType: text/html
                    _jobCode: connector_product_quick_export
                    _displayedColumnsOnly: 0
                context:
                    withHeader: true
                messages:
                    empty_selection: pim_datagrid.mass_action.delete.empty_selection
                launcherOptions:
                    group: quick_export
```
2. create a service in the file Resources/config/services.yml
e.g Replace AcmeBundle with your bundle name like Webkul\Magento2Bundle\Magento2Bundle
```dotenv
services:
    quick_export_connector:
        class: Webkul\AcmeBundle\Acme2Bundle
        tags:
            - { name: wk_quick_export_register }
```
### Features:

With Akeneo Quick Export Configurator developer can add quick export job option in the akeneo 5 easily.  


### Requirements:

* Akeneo PIM >= 5.x
