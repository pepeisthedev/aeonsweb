export const Section = ({ title, children }) => (
    <div className="flex-grow overflow-y-auto mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">{title}</h2>
        {children}
    </div>
);
