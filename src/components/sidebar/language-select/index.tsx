import { FormLabel, Select, VStack } from '@chakra-ui/react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { SUPPORTED_LANGUAGES } from '@components/code-editor/utils'
import { activeFileLanguage, resolvedLanguage } from '@store/selectors/code-editor'

const LanguageSelect = () => {
  const [languageOverride, setLanguageOverride] = useRecoilState(activeFileLanguage)
  const detected = useRecoilValue(resolvedLanguage)

  const detectedName = SUPPORTED_LANGUAGES.find(item => item.id === detected)?.name || detected

  return (
    <VStack spacing={0} alignItems='flex-start' w='100%'>
      <FormLabel mb={1} htmlFor='language-select' fontWeight='medium'>
        Language
      </FormLabel>
      <Select
        id='language-select'
        size='sm'
        borderRadius='md'
        value={languageOverride}
        onChange={({ target }) => setLanguageOverride(target.value)}
      >
        <option value=''>Auto ({detectedName})</option>
        {SUPPORTED_LANGUAGES.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </Select>
    </VStack>
  )
}

export default LanguageSelect
