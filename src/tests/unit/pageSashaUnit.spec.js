import { assert } from 'chai';

// Вынесем функцию для теста
function filteredServers(state) {
    let filtered = [...state.errorBlocks];

    if (state.selectGroupPanel.group && state.selectGroupPanel.group !== 'Все') {
        filtered = filtered.filter(server => server.block?.name === state.selectGroupPanel.group);
    }

    if (state.selectGroupPanel.status && state.selectGroupPanel.status !== 'Все') {
        filtered = filtered.filter(server =>
            server.state.toString() === (state.selectGroupPanel.status === 'Активировано' ? 'true' : 'false')
        );
    }

    if (state.selectedErrors.length > 0) {
        filtered = filtered.filter(server => {
            const hasMatchingErrors = (errors) => {
                return Array.isArray(errors) && errors.some(error =>
                    error.serverId === server.id &&
                    Number.isInteger(error.importance) &&
                    state.selectedErrors.includes(error.importance) && error.state === false
                );
            };
            return hasMatchingErrors(server.errors) ||
                (server.block && Array.isArray(server.block.servers) && server.errors.state === false &&
                    server.block.servers.some(s => s && hasMatchingErrors(s.errors)));
        });
    }

    if (state.searchValue.trim() !== '') {
        const searchLower = state.searchValue.toLowerCase();
        filtered = filtered.filter(server =>
            (server.hostName?.toLowerCase().includes(searchLower) ||
                server.ipAddres?.toLowerCase().includes(searchLower))
        );
    }

    state.filteredServersData = filtered;
}

// --- Тесты ---

describe('filteredServers', () => {

    it('возвращает все errorBlocks если фильтры не заданы', () => {
        const state = {
            errorBlocks: [
                {
                    id: '1',
                    hostName: 'host1',
                    ipAddres: '1.1.1.1',
                    state: true,
                    block: { name: 'group1', servers: [] },
                    errors: []
                },
                {
                    id: '2',
                    hostName: 'host2',
                    ipAddres: '2.2.2.2',
                    state: false,
                    block: { name: 'group2', servers: [] },
                    errors: []
                }
            ],
            selectGroupPanel: { group: 'Все', status: 'Все' },
            selectedErrors: [],
            searchValue: '',
            filteredServersData: []
        };

        filteredServers(state);

        assert.deepEqual(state.filteredServersData, state.errorBlocks);
    });

    it('фильтрует по группе', () => {
        const state = {
            errorBlocks: [
                { id: '1', block: { name: 'web' }, state: true, errors: [] },
                { id: '2', block: { name: 'medo' }, state: false, errors: [] }
            ],
            selectGroupPanel: {group: 'web', status: ''},
            selectedErrors: [],
            searchValue: '',
            filteredServersData: []
        };

        filteredServers(state);

        assert.equal(state.filteredServersData.length, 1);
        assert.equal(state.filteredServersData[0].block.name, 'web');
    });

    it('фильтрует по статусу "Активировано"', () => {
        const state = {
            errorBlocks: [
                { id: '1', state: true, block: {}, errors: [] },
                { id: '2', state: false, block: {}, errors: [] }
            ],
            selectGroupPanel: {group: '', status: 'Активировано'},
            selectedErrors: [],
            searchValue: '',
            filteredServersData: []
        };

        filteredServers(state);

        assert.equal(state.filteredServersData.length, 1);
        assert.isTrue(state.filteredServersData[0].state);
    });

    it('фильтрует по поисковому значению', () => {
        const state = {
            errorBlocks: [
                { id: '1', hostName: 'web01', ipAddres: '10.0.0.1', block: {}, errors: [] },
                { id: '2', hostName: 'medo01', ipAddres: '10.0.0.2', block: {}, errors: [] }
            ],
            selectGroupPanel: { group: 'Все', status: 'Все' },
            selectedErrors: [],
            searchValue: 'web01',
            filteredServersData: []
        };

        filteredServers(state);

        assert.equal(state.filteredServersData.length, 1);
        assert.equal(state.filteredServersData[0].hostName, 'web01');
    });

    it('фильтрует по selectedErrors', () => {
        const state = {
            errorBlocks: [
                {
                    id: '1',
                    errors: [
                        { serverId: '1', importance: 2, state: false }
                    ],
                    block: { servers: [] },
                    state: true
                },
                {
                    id: '2',
                    errors: [
                        { serverId: '2', importance: 3, state: true }
                    ],
                    block: { servers: [] },
                    state: true
                }
            ],
            selectGroupPanel: { group: 'Все', status: 'Все' },
            selectedErrors: [2],
            searchValue: '',
            filteredServersData: []
        };

        filteredServers(state);

        assert.equal(state.filteredServersData.length, 1);
        assert.equal(state.filteredServersData[0].id, 1);
    });

});
