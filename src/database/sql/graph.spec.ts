import { runQuery } from '../../../test/postgresql';

const verse1 = 'In the beginning God created the heavens and the earth';
const verse2 = 'Now the earth was formless and empty';
const chapter = {
  verses: [verse1, verse2],
};
const book = {
  properties: { name: { value: 'Genesis' } },
  chapters: [chapter],
};
const bible = {
  properties: { name: { value: 'NIV' } },
  books: [book],
};

const sql = `
  do $$
  declare
    v_bible_id bigint;
  begin
    call graph_create_bible(
      v_bible_id,
      '${JSON.stringify(bible.properties)}'::json,
      json_build_object(),
      '${JSON.stringify(bible.books)}'::json
    );
  end
  $$;

  select * from graph_build_textual_nodes();
`;

describe('Create Bible data', () => {
  jest.setTimeout(180_000);

  it('should build verse texts back', async () => {
    const results = await runQuery(sql);

    const verseValues = results[1].rows
      .filter(({ type }) => type === 'word-sequence')
      .map(({ value }) => value);

    expect(chapter.verses).toEqual(verseValues);
  });
});
