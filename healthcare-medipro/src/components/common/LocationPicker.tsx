'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { API_ADDRESS_VN_URL, FormFieldType } from '@/constants';
import CustomFormField from '../Form/CustomFormField';
import { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { District, Province, Ward } from '@/types/address.type';

interface LocationPickerProps {
  formControl: Control<any>;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ formControl }) => {
  const t = useTranslations('Registration.Address');
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedWard, setSelectedWard] = useState<string>('');

  const fetchProvinces = useCallback(async () => {
    const response = await fetch(`${API_ADDRESS_VN_URL}/p/`);
    const data = await response.json();
    setProvinces(data);
  }, []);

  const fetchDistricts = useCallback(async (provinceCode: string) => {
    const response = await fetch(`${API_ADDRESS_VN_URL}/p/${provinceCode}?depth=2`);
    const data = await response.json();
    setDistricts(data.districts);
  }, []);

  const fetchWards = useCallback(async (districtCode: string) => {
    const response = await fetch(`${API_ADDRESS_VN_URL}/d/${districtCode}?depth=2`);
    const data = await response.json();
    setWards(data.wards);
  }, []);

  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedDistrict('');
    setSelectedWard('');
    fetchDistricts(value);
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedWard('');
    fetchWards(value);
  };

  const handleWardChange = (value: string) => {
    setSelectedWard(value);
  };

  return (
    <div className='flex flex-col gap-6 xl:flex-row'>
      <CustomFormField
        control={formControl}
        name="province"
        label={t('Province')}
        placeholder={t('Placeholder_province')}
        fieldType={FormFieldType.SELECT}
        options={provinces.map((province) => ({ value: province.code.toString(), label: province.name }))}
        onChange={handleProvinceChange}
      />

      <CustomFormField
        control={formControl}
        name="district"
        label={t('District')}
        placeholder={t('Placeholder_district')}
        fieldType={FormFieldType.SELECT}
        options={districts.map((district) => ({ value: district.code.toString(), label: district.name }))}
        onChange={handleDistrictChange}
        disabled={!selectedProvince}
      />

      <CustomFormField
        control={formControl}
        name="ward"
        label={t('Ward')}
        placeholder={t('Placeholder_ward')}
        fieldType={FormFieldType.SELECT}
        options={wards.map((ward) => ({ value: ward.code.toString(), label: ward.name }))}
        onChange={handleWardChange}
        disabled={!selectedDistrict}
      />
    </div>
  );
};

export default LocationPicker;
