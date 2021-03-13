<?php

namespace Webkul\QuickExportConfiguratorBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Reference;

class RegisterQuickExportPass implements CompilerPassInterface
{
    /** @staticvar string */
    const QUICK_EXPORT_TAG = 'wk_quick_export_register';

    /** @staticvar string */
    const QUICK_EXPORT_REGISTRY = 'wk_quick_export.registry.bundles';

    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasDefinition(self::QUICK_EXPORT_REGISTRY)) {
            throw new \LogicException('Quick export registry must be configured');
        }

        $registry = $container->getDefinition(self::QUICK_EXPORT_REGISTRY);
        $taggedServices = $container->findTaggedServiceIds(self::QUICK_EXPORT_TAG);
        
        foreach ($taggedServices as $id => $attributes) {
            $quick_export_name = str_replace('quick_export_', '', $id);
            $registry->addMethodCall('register', [$quick_export_name, new Reference($id)]);
        }
    }
}
