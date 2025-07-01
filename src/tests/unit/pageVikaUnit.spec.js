import { assert } from 'chai';

// Вынесем функции для теста

function addServer(servers, groups, {dns, ip, group}) {
    const targetGroup = groups.find(g => g.name === group);
    if (!targetGroup) throw new Error('Группа не найдена');

    const exists = servers.find(s =>
        s.hostName === dns && s.ipAddres === ip && s.blockId === targetGroup.id
    );
    if (exists) throw new Error('Сервер уже существует');

    const payload = {
        hostName: dns?.trim(),
        ipAddres: ip?.trim(),
        blockId: targetGroup.id,
    };

    return [...servers, payload];
}

function deleteServer(servers, id) {
    if (!servers.some(s => s.id === id)) return servers; // id нет - возвращаем без изменений
    return servers.filter(s => s.id !== id);
}

function editServer(servers, groups, {id, dns, ip, group}) {
    const block = groups.find(g => g.name === group);
    if (!block) throw new Error('Группа не найдена');

    const serverIndex = servers.findIndex(s => s.id === id);
    if (serverIndex === -1) throw new Error('Сервер не найден');

    const updatedServer = {
        ...servers[serverIndex],
        hostName: dns,
        ipAddres: ip,
        blockId: block.id,
    };

    // Возвращаем новый массив с обновленным сервером
    return [
        ...servers.slice(0, serverIndex),
        updatedServer,
        ...servers.slice(serverIndex + 1),
    ];
}

// --- Тесты ---

describe('addServer', () => {
    const groups = [{ id: 1, name: 'Group1' }, { id: 2, name: 'Group2' }];
    const servers = [{ id: 10, hostName: 'host1', ipAddres: '1.1.1.1', blockId: 1 }];

    it('добавляет новый сервер', () => {
        const newServer = { dns: 'host2', ip: '2.2.2.2', group: 'Group1' };
        const result = addServer(servers, groups, newServer);
        assert.equal(result.length, 2);
        assert.deepInclude(result, { hostName: 'host2', ipAddres: '2.2.2.2', blockId: 1 });
    });


    it('выбрасывает ошибку если сервер уже есть', () => {
        const duplicate = { dns: 'host1', ip: '1.1.1.1', group: 'Group1' };
        assert.throws(() => addServer(servers, groups, duplicate), 'Сервер уже существует');
    });
});

describe('deleteServer', () => {
    const servers = [
        { id: 1, hostName: 'a', ipAddres: '1.1.1.1' },
        { id: 2, hostName: 'b', ipAddres: '2.2.2.2' }
    ];

    it('удаляет сервер по id', () => {
        const result = deleteServer(servers, 1);
        assert.equal(result.length, 1);
        assert.notInclude(result.map(s => s.id), 1);
    });

    it('ничего не удаляет если id нет', () => {
        const result = deleteServer(servers, 999);
        assert.equal(result.length, 2);
    });
});

describe('editServer', () => {
    const groups = [{ id: 1, name: 'Group1' }, { id: 2, name: 'Group2' }];
    const servers = [
        { id: 1, hostName: 'a', ipAddres: '1.1.1.1', blockId: 1 },
        { id: 2, hostName: 'b', ipAddres: '2.2.2.2', blockId: 2 }
    ];

    it('редактирует существующий сервер', () => {
        const edited = { id: 1, dns: 'aa', ip: '1.1.1.100', group: 'Group2' };
        const result = editServer(servers, groups, edited);
        const updatedServer = result.find(s => s.id === 1);
        assert.equal(updatedServer.hostName, 'aa');
        assert.equal(updatedServer.ipAddres, '1.1.1.100');
        assert.equal(updatedServer.blockId, 2);
    });

    it('выбрасывает ошибку если группа не найдена', () => {
        const edited = { id: 1, dns: 'aa', ip: '1.1.1.100', group: 'NoGroup' };
        assert.throws(() => editServer(servers, groups, edited), 'Группа не найдена');
    });
});