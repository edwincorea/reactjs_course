import _ from "lodash";

import {makeDiff, mergeDiff, IS_UNCHANGED} from "../diff";

//Tests harness
runDiffTests({
    scalar: {
        "changed on numbers": [
            1, 2, 
            2
        ],
        "unchanged on numbers": [
            1, 1,
            IS_UNCHANGED
        ],
        "changed on type": [
            1, "1",
            "1"
        ],
        "unchanged on null": [
            null, null,
            IS_UNCHANGED
        ]
    },
    array: {
        "throws on invalid type": () => {
            expect(() => makeDiff("test", [])).toThrow();
        },
        "unchanged on empty": () => [
            [], [], 
            IS_UNCHANGED
        ],
        "empties array": [
            [1, 2, 3], [],
            {$splice: [0, 3]}
        ]        
    },
    simpleArrays: {
        "unchanged": [
            [1, 2, 3], [1, 2, 3],
            IS_UNCHANGED
        ],
        "splice": [
            [1, 2, 3], [1, 2, 4, 5],
            {$splice: [2, 1, 4, 5]}
        ],
        "add one item at end": [
            [1, 2, 3], [1, 2, 3, 4],
            {$splice: [3, 0, 4]}
        ],
        "remove one item at end": [
            [1, 2, 3], [1, 2],
            {$splice: [2, 1]}
        ],
        "remove one in the middle": [
            [1, 2, 3], [1, 3],
            {$splice: [1, 2, 3]}
        ]
    },
    complexArrays: {
        "unchanged": [
            [
                {id: 1, text: "text1"},
                {id: 2, text: "text2"},
                {id: 3, text: "text3"}
            ],
            [
                {id: 1, text: "text1"},
                {id: 2, text: "text2"},
                {id: 3, text: "text3"}
            ],
            IS_UNCHANGED            
        ],
        "removes one": [
            [
                {id: 1, text: "text1"},
                {id: 2, text: "text2"}
            ],
            [
                {id: 1, text: "text1"}
            ],
            {$update: {}, ids: [1]}
        ],
        "reorder": [
            [
                {id: 1, text: "text1"},
                {id: 2, text: "text2"}
            ],
            [
                {id: 2, text: "text2"},
                {id: 1, text: "text1"}
            ],
            {$update: {}, ids: [2, 1]}
        ],
        "update": [
            [
                {id: 1, text: "text1"},
                {id: 2, text: "text2"}
            ],
            [
                {id: 1, text: "text1"},
                {id: 2, text: "text2Updated"}
            ],
            {$update: {2: {text: "text2Updated"}}}
        ],
        "update and reorder": [
            [
                {id: 1, text: "text1"},
                {id: 2, text: "text2"}
            ],
            [
                {id: 2, text: "text2Updated"},
                {id: 1, text: "text1"}                
            ],
            {$update: {2: {text: "text2Updated"}}, ids: [2, 1]}
        ]        
    },
    objects: {
        "throws on invalid type": () => {
            expect(() => makeDiff("text1", {})).toThrow();
        },
        "set nested": [
            {key1: {innerKey1: {test1: 1, test2: "2"}}},
            {key1: {innerKey1: {test1: 2, test2: "2"}}},
            {key1: {innerKey1: {test1: 2}}}
        ],
        "add property": [
            {unchanged: "test1"},
            {unchanged: "test1", added: "test2"},
            {added: "test2"}
        ],
        "remove property": [
            {unchanged: "test1", toRemove: 123},
            {unchanged: "test1"},
            {toRemove: {$remove: true}}
        ]
    }
});

//Run a hierarchy of tests
function runDiffTests(tests) {
    _.forOwn(tests, (test, key) => {
        if(_.isFunction(test)) {
            it(key, test);
        } else if (_.isArray(test)) {
            const [before, after, diff] = test;
            const result = makeDiff(before, after);

            describe(`(${key})`, () => {
                it("diff", () => {
                    expect(result).toEqual(diff);
                });

                if (result != IS_UNCHANGED) {
                    it("merge", () => {
                        const mergedBack = mergeDiff(before, result);
                        expect(mergedBack).toEqual(after);
                    });
                }
            });
        } else if (_.isObject(test)) {
            describe(`${key}:`, () => runDiffTests(test));
        } 
    });      
}