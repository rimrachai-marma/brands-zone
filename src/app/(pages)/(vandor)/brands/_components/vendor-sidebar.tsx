"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BarChart3,
  ShoppingBag,
  ShoppingCart,
  Package,
  Tag,
  DollarSign,
  CreditCard,
  FileText,
  Users,
  MessageSquare,
  Star,
  Store,
  Truck,
  Settings,
  ChevronUp,
  User,
  LogOut,
  ChartCandlestick,
  Undo2,
  ShieldBan,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function VendorSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Overview",
      items: [
        {
          icon: LayoutDashboard,
          label: "Dashboard",
          href: "/brands/dashboard",
        },
        { icon: BarChart3, label: "Analytics", href: "/brands/analytics" },
      ],
    },
    {
      title: "My Store",
      items: [
        { icon: ShoppingBag, label: "Products", href: "/brands/products" },
        { icon: ShoppingCart, label: "Orders", href: "/brands/orders" },
      ],
    },
    {
      title: "Inventory",
      items: [
        {
          icon: Package,
          label: "Purchase Orders",
          href: "/brands/purchase-orders",
        },
        { icon: Tag, label: "Suppliers", href: "/brands/suppliers" },
        {
          icon: ChartCandlestick,
          label: "Current Stock",
          href: "/brands/current-stock",
        },

        {
          icon: ChartCandlestick,
          label: "Current Stock Details",
          href: "/brands/stock",
        },

        { icon: Undo2, label: "Returns", href: "/brands/returns" },
        {
          icon: ShieldBan,
          label: "Losses And Damages",
          href: "/brands/losses-damages",
        },
      ],
    },
    {
      title: "Finance",
      items: [
        { icon: DollarSign, label: "Earnings", href: "/brands/earnings" },
        { icon: CreditCard, label: "Payouts", href: "/brands/payouts" },
        { icon: FileText, label: "Invoices", href: "/brands/invoices" },
      ],
    },
    {
      title: "Customer",
      items: [
        { icon: Users, label: "Customers", href: "/brands/customers" },
        { icon: MessageSquare, label: "Messages", href: "/brands/messages" },
        { icon: Star, label: "Reviews", href: "/brands/reviews" },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          icon: Store,
          label: "Store Settings",
          href: "/brands/store-settings",
        },
        { icon: Truck, label: "Shipping", href: "/brands/shipping" },
        { icon: Settings, label: "Account", href: "/brands/account" },
      ],
    },
  ];

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Store className="h-8 w-8" />
              <span className="text-lg font-bold text-slate-900">
                Brands Panel
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map((group, idx) => (
          <SidebarGroup key={idx}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={itemIdx}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-3"
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Admin"
                    />
                    <AvatarFallback className="rounded-lg">AD</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Admin</span>
                    <span className="truncate text-xs text-muted-foreground">
                      admin@platform.com
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="top"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Store className="mr-2 h-4 w-4" />
                  <span>Store Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
