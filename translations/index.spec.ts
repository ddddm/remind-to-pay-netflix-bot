import { t } from '.';

test('translation module handles the test phrase', () => {
    const translatedString = t('test');
    expect(translatedString === 'Тест');
})