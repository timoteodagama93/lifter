import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import DropdownLink from './DropdownLink';
import useTypedPage from '@/Hooks/useTypedPage';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/core';
import { useStateContext } from '@/contexts/PaginaActualContext';
import { Perfil } from '@/Pages/Perfil';
import axios from 'axios';
import { Link } from '@inertiajs/react';
import { MdNotifications } from 'react-icons/md';

function UserAvatar() {
  const page = useTypedPage();
  const route = useRoute();
  const { setCurrentPage, setOpenMobileMenu } = useStateContext();

  function logout(e: React.FormEvent) {
    e.preventDefault();
    router.post(route('logout'));
  }

  const [unread, setUnread] = useState(0);
  function unreadComunications() {
    axios
      .post(`/get-unread`)
      .then(response => {
        if (response.status === 200) {
          setUnread(response.data);
        }
      })
      .catch(error => {});
  }

  useEffect(unreadComunications, []);
  return (
    <div className="right-full m- sm:flex sm:items-center sm:ml-  rounded-full">
      <div className="ml-0 relative">
        {/* <!-- Teams Dropdown --> */}
        {page.props.jetstream.hasTeamFeatures ? (
          <Dropdown
            align="right"
            width="28"
            renderTrigger={() => (
              <span className="inline-flex rounded-md">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
                >
                  {page.props.auth.user?.current_team?.name}

                  <svg
                    className="ml-2 -mr-0.5 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            )}
          >
            <div className="absolute bottom-0 right-0 w-60">
              {/* <!-- Team Management --> */}
              {page.props.jetstream.hasTeamFeatures ? (
                <>
                  <div className="block px-4 py-2 text-xs text-gray-400">
                    Manage Team
                  </div>

                  {/* <!-- Team Settings --> */}
                  <DropdownLink
                    href={route('teams.show', [
                      page.props.auth.user?.current_team!,
                    ])}
                  >
                    Team Settings
                  </DropdownLink>

                  {page.props.jetstream.canCreateTeams ? (
                    <DropdownLink href={route('teams.create')}>
                      Create New Team
                    </DropdownLink>
                  ) : null}

                  <div className="border-t border-gray-200 dark:border-gray-600" />

                  {/* <!-- Team Switcher --> */}
                  <div className="block px-4 py-2 text-xs text-gray-400">
                    Switch Teams
                  </div>

                  {Page.props.auth.user?.all_teams?.map(team => (
                    <form onSubmit={e => switchToTeam(e, team)} key={team.id}>
                      <DropdownLink as="button">
                        <div className="flex items-center">
                          {team.id == page.props.auth.user?.current_team_id && (
                            <svg
                              className="mr-2 h-5 w-5 text-green-400"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          )}
                          <div>{team.name}</div>
                        </div>
                      </DropdownLink>
                    </form>
                  ))}
                </>
              ) : null}
            </div>
          </Dropdown>
        ) : null}
      </div>

      {/* <!-- Settings Dropdown --> */}
      <div className="mr-3 relative">
        <Dropdown
          align="rigth"
          width="48"
          renderTrigger={() =>
            page.props.jetstream.managesProfilePhotos ? (
              <button className="flex text-sm border-2 border-transparent rounded-full shadow-sm shadow-white focus:outline-none  focus:border-gray-300 transition">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={`/users/${page.props.auth.user?.profile_photo_path}`}
                  //src={page.props.auth.user?.profile_photo_url}
                  alt={page.props.auth.user?.name}
                />
              </button>
            ) : (
              <span className="inline-flex rounded-md">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
                >
                  {page.props.auth.user?.name}

                  <svg
                    className="ml-2 -mr-0.5 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
              </span>
            )
          }
        >
          {/* <!-- Account Management --> */}
          <div className="block px-4 py-2 text-xs text-gray-400">
            Gerir Conta
          </div>
          
          <div onClick={() => setOpenMobileMenu(false)}>
            <DropdownLink href={route('popularity')}>Popularidade</DropdownLink>
          </div>
          <div onClick={() => setOpenMobileMenu(false)}>
            <DropdownLink href={route('perfil')}>Meu Feed</DropdownLink>
          </div>
          <div onClick={() => setOpenMobileMenu(false)}>
            <DropdownLink href={route('perfis')}>Gestor de perfís</DropdownLink>
          </div>
          <div onClick={() => setOpenMobileMenu(false)}>
            <DropdownLink href={route('profile.show')}>Definições</DropdownLink>
          </div>

          {page.props.jetstream.hasApiFeatures ? (
            <div onClick={() => setOpenMobileMenu(false)}>
              <DropdownLink href={route('api-tokens.index')}>
                API Tokens
              </DropdownLink>
            </div>
          ) : null}

          <div className="border-t border-gray-200 dark:border-gray-600"></div>

          {/* <!-- Authentication --> */}
          <form onSubmit={logout}>
            <div onClick={() => setOpenMobileMenu(false)}>
              <DropdownLink as="button">Terminar sessão</DropdownLink>
            </div>
          </form>
        </Dropdown>
      </div>
    </div>
  );
}

export default UserAvatar;
