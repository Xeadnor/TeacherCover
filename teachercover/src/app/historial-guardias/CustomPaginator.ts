import { MatPaginatorIntl } from '@angular/material/paginator';

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();
  
  customPaginatorIntl.itemsPerPageLabel = 'Número de guardias:';

  return customPaginatorIntl;
}