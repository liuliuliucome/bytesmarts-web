declare namespace MDX {
  type CommonFileds = {
    title: string;
    description?: string;
    seoTitle?: string;
    seoDescription?: string;
    /**
     * @default 'icon-expand'
     */
    sidebarIconFont?: string;
  };

  type With<T> = T & Record<string, any>;
}
