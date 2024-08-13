import { cn } from "@/lib/utils"
import { NavigationMenuLink } from "../ui/navigation-menu"
import React from "react"

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="mb-2 hover:bg-secondary hover-title-change cursor-pointer p-3.5 rounded-lg lg:py-3 lg:mx-2">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 no-underline transition-colors focus:bg-secondary focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="title text-14-semibold text-foreground">
            {title}
          </div>
          <p className="line-clamp-2 text-14-regular text-foreground leading-7">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

export default ListItem;