import { storiesOf } from '@storybook/vue';
import { text, select, boolean } from '@storybook/addon-knobs';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvTooltipNotesMD from '@carbon/vue/src/components/cv-tooltip/cv-tooltip-notes.md';
import CvInteractiveTooltip from '@carbon/vue/src/components/cv-tooltip/cv-interactive-tooltip';
import CvTooltip from '@carbon/vue/src/components/cv-tooltip/cv-tooltip';
import CvDefinitionTooltip from '@carbon/vue/src/components/cv-tooltip/cv-definition-tooltip';

const storiesDefault = storiesOf('Default/CvTooltip', module);
const storiesExperimental = storiesOf('Experimental/CvTooltip', module);
import { componentsX, versions, setVersion } from '@carbon/vue/src/internal/feature-flags';
import Filter16 from '@carbon/icons-vue/lib/filter/16';

let preKnobs = {
  direction: {
    group: 'attr',
    type: select,
    config: [
      'direction',
      {
        Top: 'top',
        Right: 'right',
        Bottom: 'bottom',
        Left: 'left',
      },
      'bottom',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: {
      type: String,
      name: 'direction',
    },
  },
  label: {
    group: 'content',
    slot: {
      name: 'label',
      value: `
    Tooltip label
  `,
    },
  },
  trigger: {
    group: 'content',
    slot: {
      name: 'trigger',
      value: `<Filter16 v-if="componentsX" class="bx--overflow-menu__icon bx--toolbar-filter-icon" />
      <svg v-else width="16" height="12" viewBox="0 0 16 12">
      <path d="M8.05 2a2.5 2.5 0 0 1 4.9 0H16v1h-3.05a2.5 2.5 0 0 1-4.9 0H0V2h8.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM3.05 9a2.5 2.5 0 0 1 4.9 0H16v1H7.95a2.5 2.5 0 0 1-4.9 0H0V9h3.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    </svg>
  `,
    },
  },
  content: {
    group: 'content',
    slot: {
      name: 'content',
      value: `
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <button class="bx--button">Clicky one</button>
  `,
    },
  },
  visible: {
    group: 'attr',
    type: boolean,
    config: ['visible', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'visible',
      type: Boolean,
    },
  },
};

const variants = [{ name: 'default' }, { name: 'minimal', includes: ['content', 'definition', 'term', 'tip'] }];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const version of versions()) {
  const stories = version.experimental && !version.default ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      story.name + ' (Interactive tootlip)',
      () => {
        setVersion(version);
        const settings = story.knobs();

        // ----------------------------------------------------------------

        const templateString = `
<cv-interactive-tooltip${settings.group.attr}>${settings.group.content}
</cv-interactive-tooltip>
  `;
        // ----------------------------------------------------------------

        const templateViewString = `
    <sv-template-view
      :sv-experimental="experimental"
      sv-margin
      sv-source='${templateString.trim()}'
      sv-position="center"
      >
      <template slot="other">
        <button @click="show" style="margin-left: 500px;">Show tip</button>
        <button @click="hide">Hide tip</button>
      </template>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

        return {
          components: { CvInteractiveTooltip, SvTemplateView, Filter16 },
          data: () => ({ experimental: version.experimental, componentsX }),
          template: templateViewString,
          props: settings.props,
          methods: {
            show() {
              this.$children[0].$children[0].$children[0].show();
            },
            hide() {
              this.$children[0].$children[0].$children[0].hide();
            },
          },
        };
      },
      {
        notes: { markdown: CvTooltipNotesMD },
      }
    );
  }
}
// /* ----------------------------------------------------- */

preKnobs = {
  direction: {
    group: 'attr',
    type: select,
    config: [
      'direction',
      {
        Top: 'top',
        Bottom: 'bottom',
      },
      'bottom',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: {
      component: CvTooltip,
      name: 'direction',
    },
  },
  tip: {
    group: 'attr',
    type: text,
    config: ['tip', 'This is your tip!'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    inline: true,
    prop: {
      component: CvTooltip,
      name: 'tip',
    },
  },
  trigger: {
    group: 'content',
    slot: {
      value: `<svg width="16" height="12" viewBox="0 0 16 12">
  <path d="M8.05 2a2.5 2.5 0 0 1 4.9 0H16v1h-3.05a2.5 2.5 0 0 1-4.9 0H0V2h8.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM3.05 9a2.5 2.5 0 0 1 4.9 0H16v1H7.95a2.5 2.5 0 0 1-4.9 0H0V9h3.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
</svg>`,
    },
  },
};

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const version of versions()) {
  const stories = version.experimental && !version.default ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      story.name + ' (Tootlip)',
      () => {
        setVersion(version);
        const settings = story.knobs();

        // ----------------------------------------------------------------

        const templateString = `
<cv-tooltip${settings.group.attr}>${settings.group.content}
</cv-tooltip>
  `;

        // ----------------------------------------------------------------

        const templateViewString = `
    <sv-template-view
      :sv-experimental="experimental"
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

        return {
          components: { CvTooltip, SvTemplateView, Filter16 },
          data: () => ({ experimental: version.experimental, componentsX }),
          template: templateViewString,
          props: settings.props,
        };
      },
      {
        notes: { markdown: CvTooltipNotesMD },
      }
    );
  }
}
// /* ----------------------------------------------------- */

preKnobs = {
  direction: {
    group: 'attr',
    type: select,
    config: [
      'direction',
      {
        Top: 'top',
        Bottom: 'bottom',
      },
      'bottom',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: {
      type: String,
      name: 'direction',
    },
  },
  definition: {
    group: 'attr',
    type: text,
    config: [
      'definition',
      'Brief description of the dotted, underlined term',
      // consts.CONTENT,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: {
      type: String,
      name: 'definition',
    },
  },
  term: {
    group: 'attr',
    type: text,
    config: ['term', 'A term needeing definition'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    inline: true,
    prop: {
      component: CvDefinitionTooltip,
      name: 'term',
    },
  },
};

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const version of versions()) {
  const stories = version.experimental && !version.default ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      story.name + ' (Definition Tootlip)',
      () => {
        setVersion(version);
        const settings = story.knobs(); // stories.add(

        // ----------------------------------------------------------------

        const templateString = `
<cv-definition-tooltip${settings.group.attr} />
  `;

        // ----------------------------------------------------------------

        const templateViewString = `
    <sv-template-view
      :sv-experimental="experimental"
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

        return {
          components: { CvDefinitionTooltip, SvTemplateView },
          data: () => ({ experimental: version.experimental }),
          template: templateViewString,
          props: settings.props,
        };
      },
      {
        notes: { markdown: CvTooltipNotesMD },
      }
    );
  }
}
