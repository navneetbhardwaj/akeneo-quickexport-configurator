<?php

namespace Webkul\QuickExportConfiguratorBundle\Component;

class QuickExportBundleRegistry
{
    /** @var [] */

    protected $bundles = [];

    /**
     * Register an attribute type
     *
     * @param string $alias     *
     *
     * @return QuickExportBundleRegistry
     */
    public function register($alias, $type)
    {
        $this->bundles[$alias] = $type;

        return $this;
    }

    /**
     * Return the attribute type
     *
     * @param string $alias
     *
     * @throws \LogicException
     */
    public function get($alias)
    {
        if (!isset($this->bundles[$alias])) {
            throw new \LogicException(sprintf('quick export "%s" is not registered', $alias));
        }

        return $this->bundles[$alias];
    }

    /**
     * Return the attribute bundles aliases
     *
     * @return array
     */
    public function getAliases()
    {
        return array_keys($this->bundles);
    }

    /**
     * Return the attribute bundles aliases sorted
     *
     * @return array
     */
    public function getSortedAliases()
    {
        $bundles = array_combine(array_keys($this->bundles), array_keys($this->bundles));
        asort($bundles);

        return $bundles;
    }
}
