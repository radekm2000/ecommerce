

export const ProductNotificationsKeys = {
    all: ['productNotifications'] as const,
    list: () => [...ProductNotificationsKeys.all, 'list'] as const,
    details: () => [...ProductNotificationsKeys.all, 'detail'] as const,
    
}   