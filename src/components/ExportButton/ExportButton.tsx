import { Button } from '../../components/ui/button';
import { STYLES } from '../../constants/styles';


const ExportButton = ({ data, filename = 'all-submissions-export.csv', fields = [], }) => {
    const convertToCSV = (data) => {
        // If no fields specified, use all direct keys from first object
        const fieldConfigs = fields.length > 0 ? fields :
            Object.keys(data[0]).map(key => ({
                header: key,
                key: key
            }));

        // Create CSV header row using custom headers
        const headers = fieldConfigs.map(field => field.header || field.key);
        const csvRows = [headers.join(',')];

        // Add data rows
        for (const row of data) {
            const values = fieldConfigs.map(field => {
                let value = row;

                // Handle nested paths
                const keys = field.key.split('.');
                for (const key of keys) {
                    value = value?.[key];
                }

                // Apply custom formatter if provided
                if (field.formatter && typeof field.formatter === 'function') {
                    value = field.formatter(value, row);
                } else {
                    // Default formatting
                    if (Array.isArray(value)) {
                        value = value.join('; ');
                    } else if (value && typeof value === 'object') {
                        value = JSON.stringify(value);
                    }
                }

                // Handle null/undefined
                value = value ?? '';

                // Escape quotes and wrap in quotes
                const escaped = String(value).replace(/"/g, '""');
                return `"${escaped}"`;
            });

            csvRows.push(values.join(','));
        }

        return csvRows.join('\n');
    };

    const downloadCSV = () => {
        const csvString = convertToCSV(data);
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <Button
            onClick={downloadCSV}
            className={`${STYLES.primaryButton} bg-MVP-white rounded-[10px] flex items-center`}
        >
            Export Registrants List
        </Button>
    );
};

export default ExportButton;