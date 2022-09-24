project_files

                  id                  |           name           | description |              project_id              | content_type | size |        created_at         |        updated_at         | blob |                                         s3_key                                          | public_url | s3_key_bu | duration | public_visible |             scenario_id              
--------------------------------------+--------------------------+-------------+--------------------------------------+--------------+------+---------------------------+---------------------------+------+-----------------------------------------------------------------------------------------+------------+-----------+----------+----------------+--------------------------------------
 2994cc14-e777-4ef0-a7eb-26310c91517c | external_data_result.txt |             | 8b5bcc8a-7496-461a-b64a-23ea5424e628 | text/plain   | 4425 | 2016-01-06 03:21:57.82876 | 2016-01-06 03:21:57.82876 |      | account-files/a2e97564-a7b8-46cf-b7b2-341acb0cca03/2994cc14-e777-4ef0-a7eb-26310c91517c |            |           |          | f              | cbafe7de-4400-41f2-a4b3-71f747e57261

                  id                  |                    name                    | description |              project_id              | content_type | size  |         created_at         |         updated_at         | blob |                                         s3_key                                          | public_url | s3_key_bu | duration | public_visible |             scenario_id              
--------------------------------------+--------------------------------------------+-------------+--------------------------------------+--------------+-------+----------------------------+----------------------------+------+-----------------------------------------------------------------------------------------+------------+-----------+----------+----------------+--------------------------------------
 d7d44c1b-828e-4e40-902e-3390d04f9cbb | seeking_alpha_earnings_call_transcript.txt |             | 8b5bcc8a-7496-461a-b64a-23ea5424e628 | text/plain   | 22181 | 2016-01-06 03:21:57.967176 | 2016-01-06 03:21:57.967176 |      | account-files/a2e97564-a7b8-46cf-b7b2-341acb0cca03/d7d44c1b-828e-4e40-902e-3390d04f9cbb |            |           |          | f              | cbafe7de-4400-41f2-a4b3-71f747e57261



assessment_files

                  id                  |            assessment_id             |  file_type   |           project_file_id            |         created_at         |         updated_at         |        assessment_version_id         | assessment_section_id | details | waveform_data 
--------------------------------------+--------------------------------------+--------------+--------------------------------------+----------------------------+----------------------------+--------------------------------------+-----------------------+---------+---------------
 29a8e4d1-442a-4333-b2d7-0d0f28185f01 | 68f20f12-2d29-4def-a8d9-5939d9446b6f | SeekingAlpha | 2994cc14-e777-4ef0-a7eb-26310c91517c | 2015-12-15 16:51:18.687932 | 2016-01-06 03:21:57.840361 | 3588357a-7700-45a2-8972-f4c6d87ef447 |                       |         | 
 f194bd58-300c-4298-ab36-18f99c483657 | 68f20f12-2d29-4def-a8d9-5939d9446b6f | Source       | d7d44c1b-828e-4e40-902e-3390d04f9cbb | 2015-12-15 16:51:18.613756 | 2016-01-06 03:21:57.978963 | 3588357a-7700-45a2-8972-f4c6d87ef447 |                       |         | 



assessments
                   id                  |                                              name                                               | description |              project_id              |  status   |         created_at         |         updated_at         | import_date | deleted_at |     last_process_date      | reprocess_scheduled |              account_id              | date_period_year | date_period_quarter | date_period_month | date_period_week | date_period_day |          current_version_id          |        communication_type_id         | audio_time | bulk_import_id | person_id | owner_user_id |              company_id              | locked_at | locked_by | communication_date |           external_data_id           | compare_date | short_name | source | is_private | intended_audience | complete_date |             scenario_id              |              course_id               |        analysis_benchmark_id         | is_copied | locked | parent_assessment_id |      browser_info      | is_score_viewed | is_personal_use 
--------------------------------------+-------------------------------------------------------------------------------------------------+-------------+--------------------------------------+-----------+----------------------------+----------------------------+-------------+------------+----------------------------+---------------------+--------------------------------------+------------------+---------------------+-------------------+------------------+-----------------+--------------------------------------+--------------------------------------+------------+----------------+-----------+---------------+--------------------------------------+-----------+-----------+--------------------+--------------------------------------+--------------+------------+--------+------------+-------------------+---------------+--------------------------------------+--------------------------------------+--------------------------------------+-----------+--------+----------------------+------------------------+-----------------+-----------------
 68f20f12-2d29-4def-a8d9-5939d9446b6f | Invacare Corporation's (IVC) CEO Matthew E. Monaghan Q2 2015 Results - Earnings Call Transcript |             | 8b5bcc8a-7496-461a-b64a-23ea5424e628 | Completed | 2015-12-15 16:51:18.336359 | 2016-03-23 17:43:53.170265 |             |            | 2016-03-23 17:43:53.166679 | f                   | a2e97564-a7b8-46cf-b7b2-341acb0cca03 |             2015 |                   2 |                 0 |                0 |               0 | 3588357a-7700-45a2-8972-f4c6d87ef447 | a0c1bbb8-9ffb-4565-8bef-dc4538b70bb7 |          0 |                |           |               | 4a1ed8b7-6dc0-4ba8-b324-e057cb53fb81 |           |           | 2015-07-23         | 09ca99e9-aaf6-454a-8936-6ab5391cdc96 | 2015-04-01   |            | Admin  | t          |                   |               | cbafe7de-4400-41f2-a4b3-71f747e57261 | 539036c4-6217-4c8c-a643-674e1922384d | b199a041-347d-4416-979b-8f0fd69e73b7 | f         | f      |                      | {"browser_version":""} | f               | f


select b.id from assessments a, assessment_files b where a.id = b.assessment_id and a.id = '68f20f12-2d29-4def-a8d9-5939d9446b6f';

select * from project_files a, assessment_files b where a.id = b.project_file_id and a.id = '6ba980b4-e51a-419c-a654-5aa64efbbc9e';
