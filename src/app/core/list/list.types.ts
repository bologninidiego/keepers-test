export interface ListColumnDef {
    fieldKey: string;
    title: string;
    width: number;
    order: number;
    dataType?: 'currency' | 'string' | 'percentage';
    mask?: {
      prefix: string;
      decimals: string;
    }
}