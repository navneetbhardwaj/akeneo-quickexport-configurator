<?php

namespace Webkul\QuickExportConfiguratorBundle\Controller\Rest;

use Symfony\Component\HttpFoundation\JsonResponse;
use Webkul\QuickExportConfiguratorBundle\Component\QuickExportBundleRegistry;

class QuickExportWkModules
{
    protected $quickExportBundleRegistry;

    public function __construct(QuickExportBundleRegistry $quickExportBundleRegistry)
    {
        $this->quickExportBundleRegistry = $quickExportBundleRegistry;
    }

    public function getWkModules()
    {
        $aliases = $this->quickExportBundleRegistry->getAliases();
        
        return new JsonResponse($aliases);
    }


    public $regsitedBundles = [

    ];
}
