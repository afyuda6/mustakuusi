import {Link} from "react-router-dom";

interface BreadcrumbItem {
    label: string;
    to?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({items}: BreadcrumbProps) {
    return (
        <nav className="breadcrumb text-sm text-gray-400 text-left">
            {items.map((item, i) => {
                const isLast = i === items.length - 1;
                return (
                    <span key={i}>
                        {isLast ? (
                            <span className="text-blue-600 font-semibold">{item.label}</span>
                        ) : (<Link
                                to={item.to || "#"}
                                className="text-gray-500 hover:text-blue-600 transition-colors font-medium"
                            >
                                {item.label}
                            </Link>
                        )}
                        {i < items.length - 1 && (
                            <span className="mx-2 text-gray-300">›</span>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}