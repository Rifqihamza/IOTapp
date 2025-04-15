import { Tabs } from 'expo-router';
import CustomTabBar from '@/components/TabBar';

export default function TabLayout() {
    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                }}
            />
            <Tabs.Screen
                name="MenuPages"
                options={{
                    title: "Menu",
                }}
            />
        </Tabs>
    );
}
