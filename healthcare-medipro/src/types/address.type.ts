import { z } from 'zod';

// SearchMatches
export const SearchMatches = z.record(z.string(), z.number().array().length(2));

// BaseSchema
export const BaseSchema = z.object({
  code: z.number(),
  name: z.string(),
  matches: SearchMatches.optional()
});

// WardSchema
export const WardSchema = BaseSchema;

// DistrictSchema
export const DistrictSchema = BaseSchema.extend({
  wards: z.array(WardSchema).default([])
});

// ProvinceSchema
export const ProvinceSchema = BaseSchema.extend({
  districts: z.array(DistrictSchema).default([])
});

// Type Inferences
export type Base = z.infer<typeof BaseSchema>;
export type Ward = z.infer<typeof WardSchema>;
export type District = z.infer<typeof DistrictSchema>;
export type Province = z.infer<typeof ProvinceSchema>;
