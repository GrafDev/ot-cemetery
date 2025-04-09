
/**
 * Форматирует массив типов компании в строку с человеко-читаемыми названиями
 * @param types Массив типов компании
 * @returns Отформатированная строка с названиями типов
 */
export const formatCompanyTypes = (types: string[]): string => {
    if (!types || types.length === 0) return '';

    const typeLabels: Record<string, string> = {
        funeral_home: 'Funeral Home',
        logistics_services: 'Logistics services',
        burial_care_contractor: 'Burial care contractor'
    };

    return types.map(type => typeLabels[type] || type).join(', ');
};

/**
 * Форматирует дату в локальный формат
 * @param dateString Строка с датой в формате ISO
 * @returns Отформатированная дата
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
};
