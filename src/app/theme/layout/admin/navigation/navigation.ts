import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'feather icon-home',
        url: '/dashboard/analytics',
        breadcrumbs: false
      },

    ],

  },
  {

    id: '',
    title: 'Menues',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
          id: 'interview',
          title: 'Interview',
          type: 'item',
          url: '/interview',
          icon: 'feather icon-box',

        // id: '',
        // title: 'Pages',
        // type: 'collapse',
        // icon: 'feather icon-box',
        // children: [
        //   // {
        //   //   id: 'category',
        //   //   title: ' Product Category',
        //   //   type: 'item',
        //   //   url: '/category'
        //   // },

        // ]
      }
    ]
  },
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
