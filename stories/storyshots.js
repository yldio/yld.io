import initStoryshots, {
  multiSnapshotWithOptions,
  Stories2SnapsConverter,
} from '@storybook/addon-storyshots';
import styleSheetSerializer from 'jest-styled-components/src/styleSheetSerializer';
import { addSerializer } from 'jest-specific-snapshot';
import renderer from 'react-test-renderer';

addSerializer(styleSheetSerializer);

initStoryshots({
  suite: 'Storyshots',
  test: multiSnapshotWithOptions({
    render: renderer,
  }),
  stories2snapsConverter: new Stories2SnapsConverter({
    snapshotExtension: '.snapshot',
    storiesExtensions: ['.stories'],
  }),
});
