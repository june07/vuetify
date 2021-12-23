// Styles
import './VBtnGroup.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'
import { provideDefaults } from '@/composables/defaults'

// Utility
import { defineComponent, useRender } from '@/util'
import { toRef } from 'vue'

export const VBtnGroup = defineComponent({
  name: 'VBtnGroup',

  props: {
    divided: Boolean,

    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { densityClasses } = useDensity(props)
    const { borderClasses } = useBorder(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)

    provideDefaults({
      VBtn: {
        height: 'auto',
        color: toRef(props, 'color'),
        flat: true,
        variant: toRef(props, 'variant'),
      },
    })

    useRender(() => {
      return (
        <props.tag
          class={[
            'v-btn-group',
            {
              'v-btn-group--divided': props.divided,
            },
            themeClasses.value,
            borderClasses.value,
            densityClasses.value,
            elevationClasses.value,
            roundedClasses.value,
          ]}
          v-slots={ slots }
        />
      )
    })
  },
})