'use client';

import { Select, SelectItem } from '@nextui-org/select';
import { ChangeEvent, useEffect } from 'react';
import { Language } from '@bigfive-org/questions';
import { useRouter } from '@/navigation';
import { useParams } from 'next/navigation'; // 只保留这一个useParams导入

// 添加语言映射表
const LOCALE_TO_TEST_LANG = {
  'zh': 'zh-cn',
  'en': 'en',
  // 添加其他需要的映射
};

interface TestLanguageSwitchProps {
  availableLanguages: Language[];
  language: string;
}

export const TestLanguageSwitch = ({
  availableLanguages,
  language
}: TestLanguageSwitchProps) => {
  const router = useRouter();
  const params = useParams();
  const appLocale = (params.locale as string) || 'en';
  
  // 在组件加载时自动同步语言
  useEffect(() => {
    // 使用映射表获取对应的测试语言
    const mappedTestLang = LOCALE_TO_TEST_LANG[appLocale] || appLocale;
    
    // 确认此语言可用
    const langExists = availableLanguages.some(lang => lang.id === mappedTestLang);
    
    if (langExists && mappedTestLang !== language) {
      console.log(`自动切换语言从${language}到${mappedTestLang}`);
      router.push(`?lang=${mappedTestLang}`);
    }
  }, [appLocale, language, availableLanguages, router]);

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedLanguage = event.target.value;
    router.push(`?lang=${selectedLanguage}`);
    router.refresh();
  }

  return (
    <div className='w-30'>
      <Select
        defaultSelectedKeys={[language]}
        onChange={onSelectChange}
        aria-label='Select survey language'
        size='sm'
        name='localeSelectSmall'
        className='w-48'
        label='Survey language'
        items={availableLanguages}
      >
        {(language) => (
          <SelectItem key={language.id} value={language.id}>
            {language.text}
          </SelectItem>
        )}
      </Select>
    </div>
  );
};