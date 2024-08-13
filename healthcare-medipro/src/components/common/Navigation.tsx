'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import ListItem from '@/components/common/ListItem';

interface NavigationProps {
    title: string;
    links: { title: string; description: string; href: string }[];
    className?: string;
    menuWidth?: string;
}

const Navigation: React.FC<NavigationProps> = ({ title, links, className, menuWidth }) => {
    return (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={className}>{title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className={`${menuWidth} p-1.5 mt-2`}>
                  {links.map((link) => (
                    <ListItem key={link.title} title={link.title} href={link.href}>
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Navigation;