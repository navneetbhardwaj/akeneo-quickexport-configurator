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

### Features:

With Akeneo Quick Export Configurator developer can add quick export job option in the akeneo 5 easily.  


### Requirements:

* Akeneo PIM >= 5.x
