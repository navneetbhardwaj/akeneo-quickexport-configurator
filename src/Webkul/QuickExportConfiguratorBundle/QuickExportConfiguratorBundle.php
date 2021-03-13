<?php

namespace Webkul\QuickExportConfiguratorBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Compiler\PassConfig;
use Webkul\QuickExportConfiguratorBundle\DependencyInjection\Compiler\RegisterQuickExportPass;

class QuickExportConfiguratorBundle extends Bundle
{
    public function build(ContainerBuilder $container)
    {
        parent::build($container);

        $container->addCompilerPass(new RegisterQuickExportPass(), PassConfig::TYPE_BEFORE_OPTIMIZATION);
    }
}
