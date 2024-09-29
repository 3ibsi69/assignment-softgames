import { Card, Typography } from "antd";
import { InfoCardProps } from "../../../types/props-types";



export default function InfoCard({ title, content, icon }: InfoCardProps) {
    return (
        <Card
            className="bg-gradient-to-br from-white via-gray-100 to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-xl rounded-lg transition-transform duration-300 hover:scale-105"
            bordered={false}
            style={{ height: "100%" }}
        >
            <div className="flex items-center mb-2">
                {icon}
                <Typography.Text className="font-semibold ml-2
                 dark:text-white text-customOrange">{title}</Typography.Text>

            </div>
            <Typography.Text className="block text-gray-600 dark:text-gray-300">{content}</Typography.Text>
        </Card>
    );
};

