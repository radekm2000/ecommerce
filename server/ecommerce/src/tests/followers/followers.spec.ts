import { FollowersService } from 'src/followers/followers.service';

describe('followers service follow user method testing', () => {
  let followersRepositoryMock: any;
  let usersServiceMock: any;
  beforeEach(() => {
    followersRepositoryMock = {};
    usersServiceMock = {};
  });

  it('should throw error if user to follow doesnt exist', async () => {
    usersServiceMock = {
      findUserById: jest.fn().mockResolvedValue(null),
    };
    const userId = 0;
    const authUser = {} as any;
    const followService = new FollowersService(
      followersRepositoryMock,
      usersServiceMock,
    );
    try {
      await followService.followUser(userId, authUser);
    } catch (error) {
      expect(error.message).toEqual('Cant follow user that doesnt exist');
    }
  });
  it('should throw error if user that followed doesnt exist', async () => {
    const userToFollow = {
      id: 1,
    };
    usersServiceMock = {
      findUserById: jest.fn(),
    };
    usersServiceMock.findUserById
      .mockResolvedValueOnce(userToFollow)
      .mockResolvedValueOnce(null);
    const userId = 0;
    const authUser = {
      id: 0,
    } as any;
    const followService = new FollowersService(
      followersRepositoryMock,
      usersServiceMock,
    );
    try {
      await followService.followUser(userId, authUser);
    } catch (error) {
      expect(error.message).toEqual('Can`t find user that followed');
    }
  });

  it('should remove relationship when user already followers a person', async () => {
    const userToFollow = {
      username: 'userToFollow',
      id: 1,
    };
    const userThatFollowed = {
      username: 'userThatFollowed',
      id: 2,
    } as any;
    const existingRelationshipMock = {
      follower: userThatFollowed.id,
      following: userToFollow.id,
    };

    followersRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(existingRelationshipMock),
      remove: jest.fn(),
    };
    usersServiceMock = {
      findUserById: jest.fn(),
    };
    usersServiceMock.findUserById
      .mockResolvedValueOnce(userToFollow)
      .mockResolvedValueOnce(userThatFollowed);
    const followService = new FollowersService(
      followersRepositoryMock,
      usersServiceMock,
    );

    try {
      await followService.followUser(userToFollow.id, userThatFollowed);
      expect(followersRepositoryMock.findOne).toHaveBeenCalledWith({
        where: {
          follower: { id: userThatFollowed.id },
          following: { id: userToFollow.id },
        },
      });
      expect(followersRepositoryMock.remove).toHaveBeenCalledWith(
        existingRelationshipMock,
      );
    } catch (error) {}
  });
  it('should create a relationship if one doesnt exist yet', async () => {
    const userToFollow = {
      username: 'userToFollow',
      id: 1,
    };
    const userThatFollowed = {
      username: 'userThatFollowed',
      id: 2,
    } as any;
    const newRelationshipMock = {
      follower: userThatFollowed,
      following: userToFollow,
    };

    followersRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockReturnValue(newRelationshipMock),
      save: jest.fn(),
    };
    usersServiceMock = {
      findUserById: jest.fn(),
    };
    usersServiceMock.findUserById
      .mockResolvedValueOnce(userToFollow)
      .mockResolvedValueOnce(userThatFollowed);
    const followService = new FollowersService(
      followersRepositoryMock,
      usersServiceMock,
    );

    try {
      await followService.followUser(userToFollow.id, userThatFollowed);
      expect(followersRepositoryMock.save).toHaveBeenCalledWith(
        newRelationshipMock,
      );
      expect(followersRepositoryMock.create).toHaveBeenCalledWith({
        follower: userThatFollowed,
        following: userToFollow,
      });
    } catch (error) {}
  });
});
