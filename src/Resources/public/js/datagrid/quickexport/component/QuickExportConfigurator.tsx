import React from 'react';	
import {useTranslate, useStorageState} from '@akeneo-pim-community/shared';	
import {Form, FormValue} from 'pimdatagrid/datagrid/quickexport/component/Form';
import {Select} from 'pimdatagrid/datagrid/quickexport/component/Select';
import {Option} from 'pimdatagrid/datagrid/quickexport/component/Option';
import {FileXlsxIcon, FileIcon, FileCsvIcon, Modal, Button, useBooleanState} from 'akeneo-design-system';	
type QuickExportConfiguratorProps = {	
  showWithLabelsSelect: boolean;	
  showWithMediaSelect: boolean;	
  onActionLaunch: (formValue: FormValue) => void;	
  getProductCount: () => number;	
  modulesOptions: {}
};	
const QuickExportConfigurator = ({	
  showWithLabelsSelect,	
  showWithMediaSelect,	
  onActionLaunch,	
  getProductCount,
  modulesOptions
}: QuickExportConfiguratorProps) => {	
  const [isModalOpen, openModal, closeModal] = useBooleanState(false);	
  const translate = useTranslate();	
  const [formValue, setFormValue] = useStorageState<FormValue>({}, 'quick_export_configuration');	
  const productCount = getProductCount();	
  const readyToSubmit =	
    undefined !== formValue.type &&	
    undefined !== formValue.context &&	
    (undefined !== formValue.with_media || !showWithMediaSelect) &&	
    (undefined !== formValue['with-labels'] || !showWithLabelsSelect);	
  return (	
    <>	
      <Button	
        level="secondary"	
        title={translate('pim_datagrid.mass_action_group.quick_export.label')}	
        onClick={openModal}	
      >	
        {translate('pim_datagrid.mass_action_group.quick_export.label')}	
      </Button>	
      {isModalOpen && (	
        <Modal closeTitle={translate('pim_common.close')} onClose={closeModal}>	
          <Modal.TopRightButtons>	
            <Button	
              title={translate('pim_common.export')}	
              onClick={() => {	
                onActionLaunch(formValue);	
                closeModal();	
              }}	
              disabled={!readyToSubmit}	
            >	
              {translate('pim_common.export')}	
            </Button>	
          </Modal.TopRightButtons>	
          <Modal.SectionTitle color="brand">	
            {translate('pim_datagrid.mass_action.quick_export.configurator.subtitle')}&nbsp;|&nbsp;	
            {translate('pim_common.result_count', {itemsCount: productCount.toString()}, productCount)}	
          </Modal.SectionTitle>	
          <Modal.Title>{translate('pim_datagrid.mass_action.quick_export.configurator.title')}</Modal.Title>	
          <Form value={formValue} onChange={setFormValue}>	
            <Select name="type">	
              <Option value="csv" title={translate('pim_datagrid.mass_action.quick_export.configurator.csv')}>	
                <FileCsvIcon size={48} />	
                {translate('pim_datagrid.mass_action.quick_export.configurator.csv')}	
              </Option>	
              <Option value="xlsx" title={translate('pim_datagrid.mass_action.quick_export.configurator.xlsx')}>	
                <FileXlsxIcon size={48} />	
                {translate('pim_datagrid.mass_action.quick_export.configurator.xlsx')}	
              </Option>
              {modulesOptions.map((value) => (                
                <Option  value={value} title={translate('pim_datagrid.mass_action.quick_export.configurator.csv')}>
                  <FileIcon size={48} />
                  {translate('pim_datagrid.mass_action.quick_export.configurator.' + value )}
                </Option> 
              ))}
              
            </Select>
            <Select name="context">
              <Option
                value="grid-context"
                title={translate('pim_datagrid.mass_action.quick_export.configurator.grid_context')}
              >
                {translate('pim_datagrid.mass_action.quick_export.configurator.grid_context')}
              </Option>
              <Option
                value="all-attributes"
                title={translate('pim_datagrid.mass_action.quick_export.configurator.all_attributes')}
              >
                {translate('pim_datagrid.mass_action.quick_export.configurator.all_attributes')}
              </Option>
            </Select>
            {showWithLabelsSelect && (
              <Select name="with-labels">
                <Option
                  value="with-codes"
                  title={translate('pim_datagrid.mass_action.quick_export.configurator.with_codes')}
                >
                  {translate('pim_datagrid.mass_action.quick_export.configurator.with_codes')}
                </Option>
                <Option
                  value="with-labels"
                  title={translate('pim_datagrid.mass_action.quick_export.configurator.with_labels')}
                >
                  {translate('pim_datagrid.mass_action.quick_export.configurator.with_labels')}
                </Option>
              </Select>
            )}
            {showWithMediaSelect && (
              <Select name="with_media">
                <Option
                  value="false"
                  title={translate('pim_datagrid.mass_action.quick_export.configurator.without_media')}
                >
                  {translate('pim_datagrid.mass_action.quick_export.configurator.without_media')}
                </Option>
                <Option value="true" title={translate('pim_datagrid.mass_action.quick_export.configurator.with_media')}>
                  {translate('pim_datagrid.mass_action.quick_export.configurator.with_media')}
                </Option>
              </Select>
            )}
            {showWithMediaSelect && (
              <Select name="with_uuid">
                <Option
                  value="false"
                  title={translate('pim_datagrid.mass_action.quick_export.configurator.without_uuid')}
                >
                  {translate('pim_datagrid.mass_action.quick_export.configurator.without_uuid')}
                </Option>
                <Option value="true" title={translate('pim_datagrid.mass_action.quick_export.configurator.with_uuid')}>
                  {translate('pim_datagrid.mass_action.quick_export.configurator.with_uuid')}
                </Option>
              </Select>
            )}
          </Form>
        </Modal>
      )}
    </>
  );
};

export {QuickExportConfigurator};
