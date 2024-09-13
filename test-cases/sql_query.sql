
SELECT
    message_data::jsonb ->> 'correlationId' AS requestId,
    message_data::jsonb ->> 'status' AS status,
    CASE
        WHEN message_data::jsonb ->> 'status' = 'REJECTED' THEN
            (message_data::jsonb -> 'failedPaymentChecks' ->> 'errorMessage')::text
        ELSE
            NULL
    END AS errorMessage
FROM
    outgoing_payment_message
WHERE
    message_data::jsonb ->> 'correlationId' IN (
        '201f9b20-dd59-40a8-9666-547d27ff4d3d',
'1ebd7b33-5cea-42f0-bbf7-acafa33fc2ec',
'aedcdf0a-f4f6-4129-924f-2dbbe2e71be7',
'2cf16cb9-b8f6-49c7-a45f-a990b1c08dd1',
'aa285375-f159-4cdb-9a87-25ee2e7734da',
'9a843c4c-0b88-4039-82a3-7ec373bc2aba',
'3ac8bf5c-e955-45da-87b9-abba127a9945',
'596332ac-2579-4275-ac60-91f5c312d2a4',
'a7ac3da4-070f-4b6b-89b2-acce6d73d7cd',
'ab7a975e-5727-4e95-8a98-54b83dea3255',
'9df5c56f-158a-4e6f-a70c-36608eed7611',
'4fa2791f-0aa0-4a85-b17d-5e0f1bd03e29',
'e013ebf2-6f7e-4cc9-9945-a35b4535fa42',
'422cc24a-f398-43c5-99e3-33095493f70b',
'1c72c776-09d8-4748-a06f-015985cf0b6a',
'a1d58efb-11e3-4c1b-956e-fbbd944905b8',
'acc1541c-abf6-4518-bcf6-95b57029b7b2'
    ) AND message_type = 'CHECK_DECISION';
    