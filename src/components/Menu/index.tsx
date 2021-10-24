import {FC} from 'react' ;
import Menu, {MenuProps} from "./menu";
import SubMenu, {SubMenuProps} from "./subMenu";
import MenuItem, {MenuItemProps} from "./menuItem";

export type IMenuComponents = FC<MenuProps> & {
    Item: FC<MenuItemProps>,
    SubMenu: FC<SubMenuProps>
}
const TransMenu = Menu as IMenuComponents;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;
