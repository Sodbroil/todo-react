// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Главная',
    path: '/app/dashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Задачи',
    path: '/app/todo',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Группы',
    path: '/app/groups',
    icon: getIcon('eva:shopping-bag-fill'),
  },
];

export default navConfig;
