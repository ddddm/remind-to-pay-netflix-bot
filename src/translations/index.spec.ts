import { t } from '.';

test('translation module handles the test phrase', () => {
    const translatedString = t('test');
    expect(translatedString === 'Тест');
})

test('translation module handles the payment phrase with interpolations', () => {
    const translatedString = t('interpolation_test', {
        param: 1
    });
    expect(translatedString === 'test1');
})