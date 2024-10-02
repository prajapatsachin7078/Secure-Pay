// Loading shimmer effect
export const ListShimmerEffect = () => {
    return (
        <div className="animate-pulse flex flex-col space-y-4">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-200 rounded-lg">
                    <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
                    <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
                </div>
            ))}
        </div>
    )
}