export class ConstantsRoutes {
  //#region routes
  public static readonly HOME: string = '';
  public static readonly DASHBOARD: string = 'dashboard';

  public static readonly CATEGORIES: string = 'categories';
  public static readonly CATEGORY_FORM_NEW: string = 'categories/category-from';
  public static readonly CATEGORY_FORM_EDIT: string = 'categories/category-from/:categoryId';

  public static readonly PRODUCTS: string = 'products';
  public static readonly PRODUCTS_FORM_NEW: string = 'products/product-from';
  public static readonly PRODUCTS_FORM_EDIT: string = 'products/product-from/:productId';
  //#endregion
}
